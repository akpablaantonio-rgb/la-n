const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Test email configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email service ready');
  }
});

// POST endpoint for reservations
app.post('/api/reserve', async (req, res) => {
  try {
    const { name, phone } = req.body;

    // Validation
    if (!name || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nom et numéro de téléphone requis' 
      });
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: 'Nouvelle réservation - La Nuit au Zénith',
      html: `
        <h2>Nouvelle Réservation</h2>
        <p><strong>Nom complet:</strong> ${name}</p>
        <p><strong>Numéro de téléphone:</strong> ${phone}</p>
        <p><strong>Date/Heure:</strong> ${new Date().toLocaleString('fr-FR')}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Store in a simple log (optional - can be replaced with database)
    const reservation = {
      name,
      phone,
      timestamp: new Date().toISOString()
    };

    console.log('Reservation received:', reservation);

    return res.json({ 
      success: true, 
      message: 'Réservation confirmée! Un email a été envoyé.' 
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erreur lors du traitement de la réservation',
      error: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Email recipient: ${process.env.RECIPIENT_EMAIL}`);
});

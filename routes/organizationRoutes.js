const express = require('express');
const { createOrganization } = require('../controllers/organizationController');

const router = express.Router();

// Define the route to handle POST requests for creating an organization
router.post('/', createOrganization);

module.exports = router;

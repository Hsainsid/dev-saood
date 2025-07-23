const express = require("express");
const {
       createLead,
    getLeads,
    getLead,
    updateLead,
    deleteLead
} = require("../controllers/lead.controller");

const leadRouter = express.Router();

leadRouter.post('/create', createLead);
leadRouter.get('/allLeads', getLeads);
leadRouter.get('/:id', getLead);
leadRouter.put('/:id', updateLead);
leadRouter.delete('/:id', deleteLead);

module.exports = leadRouter;
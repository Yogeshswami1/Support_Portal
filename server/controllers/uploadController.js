import Contact from "../models/contactModel.js";
import csv from 'csv-parser';
import fs from 'fs';
export const uploadContacts = (req, res) => {
    const results = [];
  
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => {
        // Map your CSV data to your schema if necessary
        const formattedData = {
          date: data['Date'], // Ensure these match your CSV column headers
          name: data['Name'],
          service: data['Service'],
          email: data['Email'],
          primaryContact: data['Primary Contact'],
          secondaryContact: data['Secondary Contact'],
        };
        results.push(formattedData);
      })
      .on('end', async () => {
        try {
          const contacts = await Contact.insertMany(results);
          res.status(200).json(contacts);
        } catch (error) {
          console.error('Error inserting contacts:', error);
          res.status(500).json({ error: 'Error importing contacts' });
        } finally {
          fs.unlinkSync(req.file.path); // Remove the file after processing
        }
      })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error);
        res.status(500).json({ error: 'Error reading CSV file' });
        fs.unlinkSync(req.file.path); // Remove the file in case of error
      });
  };

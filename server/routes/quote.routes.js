import express from 'express';
import { submitQuote, getAllQuotes, deleteQuote } from '../controllers/quote.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

router.post('/quote/submit', submitQuote);
router.get('/quotes', auth, getAllQuotes);
router.delete('/quotes/:id', auth, deleteQuote);

export default router;
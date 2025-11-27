import Quote from '../models/Quote.js';

export const submitQuote = async (req, res) => {
  try {
    const { name, email, phone, propertyType, numRooms, cleaningFrequency, preferredDate, service, message, specialInstructions } = req.body;

    // Basic validation
    if (!name || !email || !propertyType || !service || !message) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    const newQuote = new Quote({
      name,
      email,
      phone,
      propertyType,
      numRooms,
      cleaningFrequency,
      preferredDate,
      service,
      message,
      specialInstructions,
    });

    await newQuote.save();
    res.status(201).json({ message: 'Quote request submitted successfully!', quote: newQuote });
  } catch (error) {
    console.error('Error submitting quote:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
};
export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
};
export const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuote = await Quote.findByIdAndDelete(id);

    if (!deletedQuote) {
      return res.status(404).json({ message: 'Quote not found.' });
    }

    res.status(200).json({ message: 'Quote deleted successfully.' });
  } catch (error) {
    console.error('Error deleting quote:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
};

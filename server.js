require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.post('/api/save-field', async (req, res) => {
  const { field, value, timestamp } = req.body;
  console.log(`📝 Field: ${field} | Value: ${value} | Time: ${timestamp}`);

  try {
    const { error } = await supabase
      .from('form_data')
      .insert([{ field, value, timestamp }]);

    if (error) {
      console.error('❌ Supabase Error:', error.message);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Saved to DB' });
  } catch (err) {
    console.error('❌ Server Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.send('✅ RSVP backend is live');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('🚀 Server running');
});

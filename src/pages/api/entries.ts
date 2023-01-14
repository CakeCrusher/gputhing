import db from '../../utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

const endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // if param title is passed in then only search for that title
    const { slug } = req.query;
    if (slug) {
      const entries = await db.collection('entries').where('slug', '==', slug).get();
      const entriesData = entries.docs.map(entry => ({
        id: entry.id,
        ...entry.data()
      }));
      res.status(200).json({ entriesData });
      return;
    }
    // otherwise return all entries
    const entries = await db.collection('entries').orderBy('created').get();
    const entriesData = entries.docs.map(entry => ({
      id: entry.id,
      ...entry.data()
    }));
    res.status(200).json({ entriesData });
  } catch (e) {
    res.status(400).end();
  }
}

export default endpoint;
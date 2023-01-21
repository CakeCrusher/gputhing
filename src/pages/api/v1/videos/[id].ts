import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/utils/db';

const endpoint = async (_req: NextApiRequest, res: NextApiResponse) => {
  let { id } = _req.query;

  if (!id) return res.status(400).send('No ID provided');
  if (Array.isArray(id)) return res.status(400).send('You may only provide one ID')

  const video = await db.collection('videos').doc(decodeURIComponent(id)).get();

  res.send({
    id: video.id,
    ...video.data()
  });
}

export default endpoint;

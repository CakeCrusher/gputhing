import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/utils/db';

const endpoint = async (_req: NextApiRequest, res: NextApiResponse) => {
  const { id } = _req.query;

  if (!id) return res.status(400).send('No ID provided');
  if (Array.isArray(id)) return res.status(400).send('You may only provide one ID')

  const video = await db.collection('game_gpu').doc(decodeURIComponent(id)).get();

  const videoData: GameGpu = {
    id: video.id,
    ...video.data()
  } as GameGpu;

  res.send(videoData);
}

export default endpoint;

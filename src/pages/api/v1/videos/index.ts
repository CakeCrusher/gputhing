import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/utils/db';

const endpoint = async (_req: NextApiRequest, res: NextApiResponse) => {
  const videos = await db.collection('videos').get();
  
  res.send(videos.docs.map(video => {
    return {
      id: video.id,
      ...video.data()
    }
  }));

}

export default endpoint;

import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/utils/db';

const endpoint = async (_req: NextApiRequest, res: NextApiResponse) => {
  const videos = await db.collection('videos').get();
  
  const videosData: Video[] = videos.docs.map(video => {
    return {
      id: video.id,
      ...video.data()
    } as Video
  })

  res.send(videosData);
}

export default endpoint;

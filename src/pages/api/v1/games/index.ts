import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/utils/db';

const endpoint = async (_req: NextApiRequest, res: NextApiResponse) => {
  const games = await db.collection('games').get();
  
  res.send(games.docs.map(game => {
    return {
      id: game.id,
      ...game.data()
    }
  }));
}

export default endpoint;

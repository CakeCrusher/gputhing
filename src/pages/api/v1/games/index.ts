import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/utils/db';

const endpoint = async (_req: NextApiRequest, res: NextApiResponse) => {
  const games = await db.collection('games').get();
  
  const gamesData: Game[] = games.docs.map(game => {
    return {
      id: game.id,
      ...game.data()
    } as Game
  })

  res.send(gamesData);
}

export default endpoint;

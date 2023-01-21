import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/utils/db';

// returns type res Gpu or res 400 error
const endpoint = async (_req: NextApiRequest, res: NextApiResponse) => {
  // get params from query string
  const { game } = _req.query;

  if (game) {
    // if game is array, return error
    if (Array.isArray(game)) return res.status(400).send('You may only provide one game');

    const game_gpus = await db.collection('game_gpu').where('game', '==', decodeURIComponent(game)).get();
    const gpusArr = game_gpus.docs.map(gpu => gpu.data().gpu);
    // TODO: eliminate this for loop
    let gpus: Gpu[] = []
    for (let i = 0; i < gpusArr.length; i++) {
      const gpu = await db.collection('gpus').doc(gpusArr[i]).get();
      gpus.push({
        id: gpu.id,
        ...gpu.data()
      });
    }
    return res.send(gpus);
  }

  const gpus = await db.collection('gpus').get();

  const gpusData: Gpu[] = gpus.docs.map(gpu => {
    return {
      id: gpu.id,
      ...gpu.data()
    }
  })

  res.send(gpusData);

}

export default endpoint;

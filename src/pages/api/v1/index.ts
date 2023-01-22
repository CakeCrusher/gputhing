import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/utils/db';

const endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    if (!req.body.video || !req.body.game || !req.body.gpu) {
      res.status(400).send('Missing video, game, or gpu data');
      return;
    }

    const createdMetrics = []
    const { video, game, gpu }: FullVideoDetails = req.body;

    if (!video.id || !game.id || !gpu.id) {
      res.status(400).send('Missing video, game, or gpu id');
      return;
    }

    // create a game document
    // create game, gpu, and video documents if they don't exist

    const gameDoc = await db.collection('games').doc(game.id).get();
    if (!gameDoc.exists) {
      createdMetrics.push('game: ' + game.id)
      const { id, ...gameData } = game;
      await db.collection('games').doc(id).set(gameData);
    }
    const gpuDoc = await db.collection('gpus').doc(gpu.id).get();
    if (!gpuDoc.exists) {
      createdMetrics.push('gpu: ' + gpu.id)
      const { id, ...gpuData } = gpu;
      await db.collection('gpus').doc(id).set(gpuData);
    }
    const videoDoc = await db.collection('videos').doc(video.id).get();
    if (!videoDoc.exists) {
      createdMetrics.push('video: ' + video.id)
      const { id, ...videoData } = video;
      await db.collection('videos').doc(id).set(videoData);
    }
    // create a game_gpu document if it does not exist
    const gameGpuDoc = await db.collection('game_gpu').doc(`${game.id}_${gpu.id}`).get();
    if (!gameGpuDoc.exists) {
      createdMetrics.push('game_gpu: ' + `${game.id}_${gpu.id}` + '  encoded: ' + encodeURIComponent(`${game.id}_${gpu.id}`))
      await db.collection('game_gpu').doc(`${game.id}_${gpu.id}`).set({
        game: game.id,
        gpu: gpu.id,
        videoIds: [video.id]
      });
    } else {
      // if it does exist, add the video id to the array
      // check if the video id is already in the array
      if (!gameGpuDoc.data()!.videoIds.includes(video.id)) {
        createdMetrics.push('game_gpu.videoId: ' + video.id)
        const newVideoIdList = gameGpuDoc.data()!.videoIds;
        newVideoIdList.push(video.id);
        await db.collection('game_gpus').doc(`${game.id}_${gpu.id}`).update({
          videoIds: newVideoIdList
        });
      }
    }
    if (createdMetrics.length === 0) {
      res.send('No new data was created');
      return;
    }
    res.send("Successfully created: \n\n" + createdMetrics.join('\n'));
  }
}

export default endpoint;

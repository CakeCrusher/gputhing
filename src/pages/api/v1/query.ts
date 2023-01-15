import { NextApiRequest, NextApiResponse } from 'next';

const VIDEOS: any = {"Cyberpunk 2077":{"Nvidia RTX 4080":{url:"https://www.youtube.com/watch?v=U1CuB-YGa9c",offset:0,width:"50",start:281,duration:25,dlss:"1440p"},"Nvidia RTX 4070 TI":{url:"https://www.youtube.com/watch?v=GjdWdNOprnc",offset:0,width:"50",start:246,duration:35,dlss:"1440p"},"Nvidia RTX 3090 TI":{url:"https://www.youtube.com/watch?v=VpZPRxMAzXs",offset:0,width:"50",start:313,duration:25,dlss:"1440p"},"Nvidia RTX 3090":{url:"https://www.youtube.com/watch?v=1rYWxAtE3V8",offset:0,width:"50",start:368,duration:40,dlss:"1440p"},"Nvidia RTX 3080 TI":{url:"https://www.youtube.com/watch?v=6GqnfqWXR3A",offset:0,width:"50",start:270,duration:25,dlss:"1440p"},"AMD RX 7900 XTX":{url:"https://www.youtube.com/watch?v=b-1D3jbL1Vs",offset:50,width:"50",start:194,duration:40,dlss:""},"AMD RX 7900 XT":{url:"https://www.youtube.com/watch?v=b-1D3jbL1Vs",offset:0,width:"50",start:194,duration:40,dlss:""}}}

// http://localhost:3000/api/v1/query?game=Cyberpunk+2077&gpus=Nvidia+RTX+4080&gpus=Nvidia+RTX+4070+TI

const endpoint = (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const game = query.game as string | undefined;
  const gpus = query.gpus as string[] | undefined;
  const result = [];

  // Check Query Parameters
  if(game === undefined || gpus === undefined) {
    return res
      .status(404)
      .send({message: "Error Invalid query. Undefined GAME or GPUS."});
  }

  // TODO: Replace everything below here with actual Query
  if(VIDEOS[game] === undefined) { // Invalid Game
    return res
      .status(200)
      .send({message: "Game not found. Check name."})
  }
  if(VIDEOS[game][gpus[0]] === undefined) { // Invalid 1st GPU
    return res
      .status(200)
      .send({message: "GPU not found. Check name."})
  }

  // Retrieve Game
  const resultGameObject = VIDEOS[game];
  // Retrieve video for 1st GPU
  result.push(resultGameObject[gpus[0]]);

  // No more GPUs, send result
  if(gpus[1] === undefined) { 
    return res.send({result});
  }

  // Invalid 2nd GPU, send result with message
  if(VIDEOS[game][gpus[1]] === undefined) {
    return res.send({result, warning: "2nd GPU not found. Check name."});
  }

  // Retrieve video for 2nd GPU, send result
  result.push(resultGameObject[gpus[1]]);
  return res.send(result);

}

export default endpoint;

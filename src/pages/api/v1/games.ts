import { NextApiRequest, NextApiResponse } from 'next';

const GAMES = [
  "Cyberpunk 2077",
  "Witcher 3",
  "Valorant"
];
const endpoint = (_req: NextApiRequest, res: NextApiResponse) => {
  res.send(GAMES);

}

export default endpoint;

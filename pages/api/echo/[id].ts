import { NextApiRequest, NextApiResponse } from 'next';

const getById = (req: NextApiRequest, res: NextApiResponse) => {
  res.json({ yourId: req.query.id });
};

export default getById;

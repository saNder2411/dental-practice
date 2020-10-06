import { NextApiRequest, NextApiResponse } from 'next';
// Auth0
import auth0 from '../../utils/auth0';

const me = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await auth0.handleProfile(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};

export default me;

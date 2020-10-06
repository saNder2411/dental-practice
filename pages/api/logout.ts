import { NextApiRequest, NextApiResponse } from 'next';
// Auth0
import auth0 from '../../utils/auth0';

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await auth0.handleLogout(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};

export default logout;

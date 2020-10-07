import { NextApiRequest, NextApiResponse } from 'next';
// Auth0
import auth0 from '../../lib/auth0';

const getList = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const accessToken = await auth0.getSession(req);
    const response = await fetch(
      `https://sa-client.metroapps.online/_api/Web/Lists/GetByTitle('ListTitle')/Fields?$select=Title,InternalName&$filter=ReadOnlyField%20eq%20false`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json;odata=verbose',
          Authorization: `Bearer ${accessToken?.accessToken}`,
        },
      }
    );

    res.json({ accessToken, response });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};
export default getList;

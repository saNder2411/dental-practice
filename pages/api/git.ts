import { NextApiRequest, NextApiResponse } from 'next';

export default async function getGit(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(`https://api.github.com/search/repositories?q=created:%3E2020-07-01&sort=stars&order=desc`);
    const data = await response.json();

    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}

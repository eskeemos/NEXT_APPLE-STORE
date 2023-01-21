import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  categories: Category[]
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const categories = await sanityCli.fetch(query);
}

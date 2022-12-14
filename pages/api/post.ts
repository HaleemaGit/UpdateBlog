
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Data = {
  title: string
  description: string
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const { title, description } = req.body;

      const newPost = await prisma.post.create({
        data: {
          title,
          description,
        },
      })
      res.status(200).json("New post successfully created");
    } catch (error) {
      res.status(500).json({ message: "something went wrong" })
    }
  }

  else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `HTTP method ${req.method} is not supported.` });
  }


 
if (req.method === 'PATCH') {
  try {
    const updatePost = await prisma.post.update({
      where: { id },
      data: req.body,
    });
    res.status(200).json(updatePost);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
} else if (req.method === 'DELETE') {
  try {
    const deletePost = await prisma.post.delete({
      where: { id },
    });
    // Remove post from Supabase storage
    if (post.id) {
      const path = post.id.split(`${process.env.SUPABASE_BUCKET}/`)?.[1];
      await supabase.storage.from(process.env.SUPABASE_BUCKET).remove([path]);
    }
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}
// HTTP method not supported!
else {
  res.setHeader('Allow', ['PATCH', 'DELETE']);
  res
    .status(405)
    .json({ message: `HTTP method ${req.method} is not supported.` });
}


}




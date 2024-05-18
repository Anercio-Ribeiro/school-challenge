import { PrismaClient } from '@prisma/client';
import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();


/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Insert multiple schools
 *     description: Insert multiple school records from a JSON array
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *                 provincia:
 *                   type: string
 *                 numeroDeSala:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Data inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Error parsing data or invalid data format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       405:
 *         description: Method not allowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */


async function extractDataFromStream(stream: ReadableStream): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();

  let result = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Decode the chunk of data
      result += decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }

  return result;
}

export async function POST(req: Request, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = req.body;

      //console.log(data);
      console.log("Data from body: "+data)
      // Check if the data is a ReadableStream
      if (data instanceof ReadableStream) {
        const extractedData = await extractDataFromStream(data);
        console.log(extractedData); // Process the extracted data

        // Parse the extracted data (assuming it's in JSON format)
        let parsedData;
        try {
          parsedData = JSON.parse(extractedData);
        } catch (error) {
          console.error('Error parsing data:', error);
          return NextResponse.json({ error: 'Error parsing data' });
        }

        console.log(parsedData.data);
      
        // Ensure parsedData is an array
        if (!Array.isArray(parsedData)) {
          await prisma.escola.createMany({
            data: parsedData.data
            });
          console.error('Parsed data is not an array:', parsedData);
          return NextResponse.json({ error: 'Parsed data is not an array' });
        }

        // Save the parsed data into the database using Prisma's createMany method
        await prisma.escola.createMany({
          data: parsedData.map((item: any) => ({
            nome: item.nome,
            email: item.email,
            provincia: item.provincia,
            numeroDeSala: item.numeroDeSala
          }))
        });

        return NextResponse.json({ message: 'Data inserted successfully' }, { status: 200 });
      } else {
        console.error('Invalid data format:', data);
        return NextResponse.json({ error: 'Invalid data format' });
      }
    } catch (error) {
      console.error('Error processing file:', error);
      return NextResponse.json({ error: 'Error processing file' });
    }
  } else {
    return NextResponse.json({ error: 'Method not allowed' });
  }
}

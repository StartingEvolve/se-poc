import { db } from './config/firebase';

//GET providers
const getAllProviders = async (req: any, res: any) => {
  try {
    const providers: any = [];
    const querySnapshot = await db.collection('providers').get();
    //Filtering out metadata
    querySnapshot.forEach((doc: any) =>
      providers.push({ ...doc.data(), id: doc._ref._path.segments[1] })
    );
    return res.status(200).json(providers);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};

//GET provider by ID
const getProviderById = async (req: any, res: any) => {
  try {
    const id = req.params.providerId;
    const provider = await db.collection('providers').doc(id.toString()).get();
    //Filtering out metadata
    return res.status(200).json(provider.data());
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};

//GET provider by name
const getProviderByName = async (req: any, res: any) => {
  try {
    const name = req.params.providerName;
    const provider = await db.collection('providers').doc(name).get();
    //Filtering out metadata
    return res.status(200).json(provider.data());
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};

export { getAllProviders, getProviderById, getProviderByName };

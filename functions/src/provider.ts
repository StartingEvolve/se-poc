import { auth, db, uuidv4 } from './config/firebase';

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

const updateProviderById = async (req: any, res: any) => {
  try {
    const patch = req.body;
    const id = req.params.providerId;
    const provider = db.collection('providers').doc(id);
    let providerData = (await provider.get()).data() || {};

    for (const [key, _] of Object.entries(providerData)) {
      if (key in patch) {
        providerData[key] = patch[key];
      }
    }

    console.log(providerData);

    await provider.set(providerData).catch((error) => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    });

    return res.status(200).json({
      status: 'success',
      message: 'provider updated successfully',
      data: providerData
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};

interface AddProviderBody {
  user: any;
  providerDoc: any;
}

const addProvider = async (req: any, res: any) => {
  try {
    const newProvider: AddProviderBody = req.body;
    const uid = uuidv4();

    await auth.createUser({
      uid,
      ...newProvider['user'],
      emailVerified: true,
      disabled: false
    });

    await db
      .collection('providers')
      .doc(uid)
      .set(newProvider['providerDoc'])
      .catch((error) => {
        return res.status(400).json({
          status: 'error',
          message: error.message
        });
      });

    return res.status(200).json({
      status: 'success',
      message: 'provider added successfully',
      data: newProvider['providerDoc']
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};

export {
  getAllProviders,
  getProviderById,
  getProviderByName,
  updateProviderById,
  addProvider
};

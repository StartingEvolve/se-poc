import { db, auth, uuidv4 } from './config/firebase';

//GET editors
const getAllEditor = async (req: any, res: any) => {
  try {
    const editors: any = [];
    const querySnapshot = await db.collection('editors').get();
    //Filtering out metadata
    querySnapshot.forEach((doc: any) =>
      editors.push({ ...doc.data(), id: doc._ref._path.segments[1] })
    );
    return res.status(200).json(editors);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};

//GET provider by ID
const getEditorById = async (req: any, res: any) => {
  try {
    const id = req.params.editorId;
    const editor = await db.collection('editors').doc(id.toString()).get();
    //Filtering out metadata
    return res.status(200).json(editor.data());
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};

const updateEditorById = async (req: any, res: any) => {
  try {
    const patch = req.body;
    const id = req.params.editorId;
    const editor = db.collection('editors').doc(id);
    let editorData = (await editor.get()).data() || {};
    let user: any = {};

    for (const [key, _] of Object.entries(editorData)) {
      if (key in patch) {
        editorData[key] = patch[key];
      }
    }

    //Creating user object
    for (const [key, _] of Object.entries(editorData)) {
      if (['email', 'phoneNumber'].includes(key)) {
        user[key] = editorData[key];
      }
    }
    if (user !== {}) {
      await auth.updateUser(id, {
        email: editorData.email,
        phoneNumber: editorData.phoneNumber
      });
    }

    console.log(editorData);

    await editor.set(editorData).catch((error) => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    });

    return res.status(200).json({
      status: 'success',
      message: 'editor updated successfully',
      data: editorData
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};

const addEditor = async (req: any, res: any) => {
  try {
    const newEditor = req.body;
    const uid = uuidv4();

    await auth.createUser({
      uid,
      ...newEditor,
      emailVerified: true,
      disabled: false
    });

    const editorData = {
      firtName: newEditor.firtName ? newEditor.firtName : '',
      lastName: newEditor.lastName ? newEditor.lastName : '',
      image: newEditor.photoUrl ? newEditor.photoUrl : '',
      email: newEditor.email,
      phoneNumber: newEditor.phoneNumber ? newEditor.phoneNumber : '',
      articleId: [],
      accountType: 'editor'
    };

    await db
      .collection('editors')
      .doc(uid)
      .set(editorData)
      .catch((error) => {
        return res.status(400).json({
          status: 'error',
          message: error.message
        });
      });

    return res.status(200).json({
      status: 'success',
      message: 'editor added successfully',
      data: editorData
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};

export { addEditor, getAllEditor, getEditorById, updateEditorById };

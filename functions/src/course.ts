import { db } from './config/firebase';

//Todo (zack) Implement pagination later
const getAllCourses = async (req: any, res: any) => {
  try {
    const courses: any = [];
    const querySnapshot = await db.collection('courses_info').get();
    //Filtering out metadata
    querySnapshot.forEach((doc: any) =>
      courses.push({ ...doc.data(), id: doc._ref._path.segments[1] })
    );
    return res.status(200).json(courses);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};

const getCourseById = async (req: any, res: any) => {
  try {
    const id = req.params.courseId;
    const course = await db.collection('courses_info').doc(id.toString()).get();
    //Filtering out metadata
    return res.status(200).json(course.data());
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};

const getCourseByStatus = async (req: any, res: any) => {
  try {
    const status = req.params.status;
    let courses: any = [];
    const querySnapshot = await db
      .collection('courses_info')
      .where('status', '==', status)
      .get();
    //Filtering out metadata
    querySnapshot.forEach((doc: any) =>
      courses.push({ ...doc.data(), id: doc._ref._path.segments[1] })
    );
    return res.status(200).json(courses);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};

const approveCourseById = async (req: any, res: any) => {
  //Todo (zack) handle errors later
  try {
    const patch = {
      status: req.body['status']
    };
    const id = req.params.courseId;
    const course = db.collection('courses_info').doc(id);
    const currentData = (await course.get()).data() || {};

    currentData.status = patch.status;

    await course.set(currentData).catch((error) => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    });

    return res.status(200).json({
      status: 'success',
      message: 'course updated successfully',
      data: currentData
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};

//Todo (zack) optimize query
const deleteCourseById = async (req: any, res: any) => {
  const id = req.params.courseId;

  try {
    const course = db.collection('courses_info').doc(id);
    const course_preview = db.collection('courses').doc(id);
    const courseData = (await course.get()).data() || {};

    //Delete main course document
    await course.delete().catch((error) => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    });

    //Delete preview course used in search
    await course_preview.delete().catch((error) => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    });

    //Delete course reference from provider
    const provider = db.collection('providers').doc(courseData.providerId);
    const providerData = (await provider.get()).data() || {};
    providerData.courseId = providerData.courseId.filter((c: any) => c != id);

    await provider.set(providerData).catch((error) => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    });

    return res.status(200).json({
      status: 'success',
      message: 'Course deleted successfully'
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};

export {
  getAllCourses,
  getCourseById,
  getCourseByStatus,
  approveCourseById,
  deleteCourseById
};

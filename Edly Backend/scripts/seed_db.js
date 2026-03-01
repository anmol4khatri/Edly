import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import User from '../src/models/User.js';
import Tenant from '../src/models/Tenant.js';
import Course from '../src/models/Course.js';
import Module from '../src/models/Module.js';
import Lesson from '../src/models/Lesson.js';
import Pdf from '../src/models/Pdf.js';
import Quiz from '../src/models/Quiz.js';
import Enrollment from '../src/models/Enrollment.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/edly';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Tenant.deleteMany({}),
      Course.deleteMany({}),
      Module.deleteMany({}),
      Lesson.deleteMany({}),
      Pdf.deleteMany({}),
      Quiz.deleteMany({}),
      Enrollment.deleteMany({}),
    ]);
    console.log('Data cleared.');

    console.log('Seeding Tenant...');
    const tenantOwnerPass = await hashPassword('password123');
    // We need a user to be the owner, but User needs a tenantId.
    // So we create Tenant first with a placeholder or null owner, then update it?
    // User schema requires tenantId. Tenant schema requires ownerId (User).
    // Let's create Tenant with a temporary ID or just generated ID first.

    const tenantId = new mongoose.Types.ObjectId();
    const tenantOwnerId = new mongoose.Types.ObjectId();

    const demoTenant = await Tenant.create({
      _id: tenantId,
      subdomain: 'demo-school',
      name: 'Demo School',
      ownerId: tenantOwnerId, // We will create this user shortly
      settings: {
        bio: 'A premier destination for learning web development and design.',
        logo: 'https://via.placeholder.com/150',
        primaryColor: '#4F46E5',
        isVerified: true,
      },
    });

    console.log('Seeding Users...');

    // 1. Tenant Admin / Owner
    const tenantAdmin = await User.create({
      _id: tenantOwnerId,
      tenantId: demoTenant._id,
      email: 'admin@demo.com',
      password: tenantOwnerPass,
      role: 'admin',
      firstName: 'Super',
      lastName: 'Admin',
    });

    // 2. Educators (Users)
    const educatorPass = await hashPassword('educator123');
    const educatorUser1 = await User.create({
      tenantId: demoTenant._id,
      email: 'educator1@demo.com',
      password: educatorPass,
      role: 'educator',
      firstName: 'Alice',
      lastName: 'Smith',
      experience: 5,
      qualifications: ['M.Sc. Computer Science', 'Certified AWS Architect'],
    });

    const educatorUser2 = await User.create({
      tenantId: demoTenant._id,
      email: 'educator2@demo.com',
      password: educatorPass,
      role: 'educator',
      firstName: 'Bob',
      lastName: 'Johnson',
      experience: 8,
      qualifications: ['PhD in Physics', 'Data Science Expert'],
    });

    // 3. Students (Users)
    const studentPass = await hashPassword('student123');
    const studentUser1 = await User.create({
      tenantId: demoTenant._id,
      email: 'student1@demo.com',
      password: studentPass,
      role: 'student',
      firstName: 'Charlie',
      lastName: 'Brown',
    });

    const studentUser2 = await User.create({
      tenantId: demoTenant._id,
      email: 'student2@demo.com',
      password: studentPass,
      role: 'student',
      firstName: 'Diana',
      lastName: 'Prince',
    });

    console.log('Seeding Courses...');

    const videoLinks = [
      'https://www.youtube.com/watch?v=kYmZ6hWb5w0', // Codecademy
      'https://www.youtube.com/watch?v=w7ejDZ8SWv8', // Crash Course
      'https://www.youtube.com/watch?v=PkZNo7MFNFg', // Javascript Full Course
      'https://www.youtube.com/watch?v=pKd0Rpw7O48', // How to learn Backend
      'https://www.youtube.com/watch?v=qz0aGYrrlhU', // HTML Tutorial
      'https://www.youtube.com/watch?v=BwuLxPH8IDs', // CSS
      'https://www.youtube.com/watch?v=hdI2bqOjy3c', // JS basics
      'https://www.youtube.com/watch?v=Oe421EPjeBE', // Node JS
      'https://www.youtube.com/watch?v=SccSCuHhOw0', // React Router
      'https://www.youtube.com/watch?v=f2EqECiTBL8', // Next.js
    ];

    const coursesData = [
      {
        title: 'Mastering the MERN Stack',
        price: 99.99,
        thumb: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600',
      },
      {
        title: 'Data Structures Bootcamp',
        price: 149.99,
        thumb: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600',
      },
      {
        title: 'UI/UX Masterclass for Devs',
        price: 79.99,
        thumb: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600',
      },
      {
        title: 'Python Django for Beginners',
        price: 49.99,
        thumb: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=600',
      },
      {
        title: 'Advanced Cloud Architecture',
        price: 199.99,
        thumb: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600',
      },
    ];

    const createdCourses = [];

    for (let i = 0; i < coursesData.length; i++) {
      const courseData = coursesData[i];
      const course = await Course.create({
        tenantId: demoTenant._id,
        title: courseData.title,
        description: `Learn everything you need to know about ${courseData.title} in this highly interactive, industry-standard modern curriculum.`,
        thumbnail: courseData.thumb,
        price: courseData.price,
        aboutCourse: [
          'Build 3+ Real World Projects',
          'Access to exclusive discord community',
          'Learn directly from Senior Engineers',
        ],
        highlights: [
          '50+ Hours of High Quality Video Content',
          'Certificate of Completion',
          'Lifetime Future-Proof Access',
        ],
        modules: [],
      });
      createdCourses.push(course);

      // Create 4 Modules per Course
      for (let m = 1; m <= 4; m++) {
        const moduleContent = [];

        // Create 4-6 Lessons per Module
        const lessonCount = Math.floor(Math.random() * 3) + 4;
        for (let l = 1; l <= lessonCount; l++) {
          const videoUrl = videoLinks[Math.floor(Math.random() * videoLinks.length)];
          const lesson = await Lesson.create({
            tenantId: demoTenant._id,
            title: `Lesson ${l}: Deep Dive into Core Concept ${m}.${l}`,
            videoUrl: videoUrl,
          });
          moduleContent.push({ type: 'Lesson', refId: lesson._id });
        }

        // Add 1 Pdf
        const pdf = await Pdf.create({
          tenantId: demoTenant._id,
          title: `Cheat Sheet for Module ${m}`,
          pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        });
        moduleContent.push({ type: 'Pdf', refId: pdf._id });

        // Add 1 Quiz per module
        const quiz = await Quiz.create({
          tenantId: demoTenant._id,
          title: `Module ${m} Assessment Quiz`,
          questions: [
            {
              question: 'What is the primary benefit of the topic covered in this module?',
              options: ['Scalability', 'Slower Rendering', 'Higher Costs', 'Harder debugging'],
              correctAnswer: 0,
            },
            {
              question: 'Which native API allows us to accomplish this?',
              options: ['fs.readFile()', 'localStorage', 'navigator.share', 'All of the above'],
              correctAnswer: 3,
            },
          ],
        });
        moduleContent.push({ type: 'Quiz', refId: quiz._id });

        const mod = await Module.create({
          title:
            m === 1
              ? 'Getting Started & Fundamentals'
              : m === 4
                ? 'Advanced Concepts & Deployment'
                : `Intermediate Section ${m}`,
          courseId: course._id,
          content: moduleContent,
        });
        course.modules.push(mod._id);
      }
      await course.save();
    }

    console.log('Seeding Enrollments...');

    // Enroll students in a few courses
    for (let i = 0; i < createdCourses.length; i++) {
      const course = createdCourses[i];

      // Student 1 buys all courses
      await Enrollment.create({
        studentId: studentUser1._id,
        courseId: course._id,
        tenantId: demoTenant._id,
        paymentId: `PAY-${Math.floor(Math.random() * 900000) + 100000}`,
      });
      studentUser1.coursesEnrolled.push(course._id);

      // Student 2 buys the first 2 courses
      if (i < 2) {
        await Enrollment.create({
          studentId: studentUser2._id,
          courseId: course._id,
          tenantId: demoTenant._id,
          paymentId: `PAY-${Math.floor(Math.random() * 900000) + 100000}`,
        });
        studentUser2.coursesEnrolled.push(course._id);
      }
    }

    await studentUser1.save();
    await studentUser2.save();

    console.log('------------------------------------------------');
    console.log('SEEDING COMPLETE');
    console.log('------------------------------------------------');
    console.log('Login Credentials (User Model - for Auth):');
    console.log('');
    console.log('1. Admin / Tenant Owner');
    console.log(`   Email:    admin@demo.com`);
    console.log(`   Password: password123`);
    console.log('');
    console.log('2. Educator');
    console.log(`   Email:    educator1@demo.com`);
    console.log(`   Password: educator123`);
    console.log('');
    console.log('3. Student');
    console.log(`   Email:    student1@demo.com`);
    console.log(`   Password: student123`);
    console.log('------------------------------------------------');

    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedData();

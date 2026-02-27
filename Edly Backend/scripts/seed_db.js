
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const User = require('../src/models/User');
const Tenant = require('../src/models/Tenant');
const Educator = require('../src/models/Educator');
const Student = require('../src/models/Student');
const Course = require('../src/models/Course');
const Module = require('../src/models/Module');
const Lesson = require('../src/models/Lesson');
const Pdf = require('../src/models/Pdf');
const Quiz = require('../src/models/Quiz');
const Enrollment = require('../src/models/Enrollment');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/edly";

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
            Educator.deleteMany({}),
            Student.deleteMany({}),
            Course.deleteMany({}),
            Module.deleteMany({}),
            Lesson.deleteMany({}),
            Pdf.deleteMany({}),
            Quiz.deleteMany({}),
            Enrollment.deleteMany({})
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
                isVerified: true
            }
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
            lastName: 'Admin'
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
            qualifications: ['M.Sc. Computer Science', 'Certified AWS Architect']
        });

        const educatorUser2 = await User.create({
            tenantId: demoTenant._id,
            email: 'educator2@demo.com',
            password: educatorPass,
            role: 'educator',
            firstName: 'Bob',
            lastName: 'Johnson',
            experience: 8,
            qualifications: ['PhD in Physics', 'Data Science Expert']
        });

        // 3. Students (Users)
        const studentPass = await hashPassword('student123');
        const studentUser1 = await User.create({
            tenantId: demoTenant._id,
            email: 'student1@demo.com',
            password: studentPass,
            role: 'student',
            firstName: 'Charlie',
            lastName: 'Brown'
        });

        const studentUser2 = await User.create({
            tenantId: demoTenant._id,
            email: 'student2@demo.com',
            password: studentPass,
            role: 'student',
            firstName: 'Diana',
            lastName: 'Prince'
        });

        console.log('Seeding Separate Educator & Student Collections (populating all models/fields)...');

        // Creating logic for 'Educator' model (separate from User based on file structure)
        const edu1 = await Educator.create({
            emailId: 'educator1@demo.com', // Matching email for consistency
            password: educatorPass,
            firstName: 'Alice',
            lastName: 'Smith',
            subdomain: 'alice-teach',
            bio: 'Passionate about coding.',
            organization: 'Tech University',
            organizationLogo: 'https://via.placeholder.com/50',
            experienceYears: 5,
            qualifications: ['M.Sc. CS'],
            isVerified: true,
            isProfileComplete: true,
            // coursesCreated will be populated after course creation if needed, or we rely on queries
        });

        // Creating logic for 'Student' model (requires educatorId)
        await Student.create({
            educatorId: edu1._id,
            firstName: 'Charlie',
            lastName: 'Brown',
            emailId: 'student1@demo.com',
            password: studentPass
        });

        console.log('Seeding Courses...');

        const course1 = await Course.create({
            tenantId: demoTenant._id,
            title: 'Full Stack Web Development',
            description: 'Master the MERN stack with this comprehensive course covering MongoDB, Express, React, and Node.js.',
            thumbnail: 'https://via.placeholder.com/300x200?text=MERN+Stack',
            price: 49.99,
            aboutCourse: ['Learn React from scratch', 'Master Backend API design', 'Database optimization techniques'],
            highlights: ['50+ Hours of Content', 'Certificate of Completion', 'Lifetime Access'],
            modules: [] // Will populate after creating modules
        });

        // Update Educator User with created course? User model doesn't have coursesCreated, but Educator model does.
        edu1.coursesCreated.push(course1._id);
        await edu1.save();


        console.log('Seeding Modules & Content...');

        // Module 1
        const lesson1 = await Lesson.create({
            title: 'Introduction to React',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        });

        const pdf1 = await Pdf.create({
            title: 'React Cheatsheet',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        });

        const quiz1 = await Quiz.create({
            title: 'React Basics Quiz',
            questions: [
                {
                    question: 'What is a Component?',
                    options: ['A function', 'A variable', 'A database', 'A server'],
                    correctAnswer: 0
                }
            ]
        });

        const module1 = await Module.create({
            title: 'Getting Started with Frontend',
            courseId: course1._id,
            content: [
                { type: 'Lesson', refId: lesson1._id },
                { type: 'Pdf', refId: pdf1._id },
                { type: 'Quiz', refId: quiz1._id }
            ]
        });

        // Module 2
        const lesson2 = await Lesson.create({
            title: 'Express Middleware',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        });

        const module2 = await Module.create({
            title: 'Backend Fundamentals',
            courseId: course1._id,
            content: [
                { type: 'Lesson', refId: lesson2._id }
            ]
        });

        // Update Course with Modules
        course1.modules.push(module1._id, module2._id);
        await course1.save();


        console.log('Seeding Enrollments...');

        // Enroll Student 1 in Course 1
        await Enrollment.create({
            studentId: studentUser1._id, // References User model
            courseId: course1._id,
            tenantId: demoTenant._id,
            paymentId: 'PAY-123456789'
        });

        // Update User model coursesEnrolled
        studentUser1.coursesEnrolled.push(course1._id);
        await studentUser1.save();


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

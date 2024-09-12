import express from 'express';
import { generateLandingPage } from '../controllers/landingPageController';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/generate-landing-page', upload.single('cv'), generateLandingPage);

export default router;
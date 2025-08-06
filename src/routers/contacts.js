import { Router } from "express";
import { createContactController, deleteContactController, getContactByIdController, getContactsController, patchContactController, upsertContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";


const router = Router();
router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));


router.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactController));


router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));
router.put('/contacts/:contactId', isValidId, ctrlWrapper(upsertContactController));
router.patch('/contacts/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));
router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));


export default router;
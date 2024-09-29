import ApiError from "../utils/ApiError.js";
import DoctorSchema from "../Schema/doctorModel.js";
import uploadCloudinary from "../utils/Cloudinary.js";

export const addDoctor = async ({
  name,
  email,
  phoneNumber,
  gender,
  imageFile,
  specialty,
  qualifications,
  workingHours,
  availabilityStatus,
}) => {
  const exitedDoctor = await DoctorSchema.findOne({
    $or: [{ name }, { email }, { phoneNumber }],
  });

  if (exitedDoctor) {
    throw new ApiError(409, "Doctor already exists");
  }
  const image = await uploadCloudinary(imageFile);

  if (!image) {
    throw new ApiError(500, "Image upload failed");
  }

  const newDoctor = await DoctorSchema.create({
    name,
    email,
    phoneNumber,
    gender,
    Image: image.url,
    specialty,
    qualifications,
    workingHours,
    availabilityStatus,
  });

  return newDoctor;
};
export const updateDoctor = async (doctorId, updateData) => {
  const existingDoctor = await DoctorSchema.findById(doctorId);
  if (!existingDoctor) {
    throw new ApiError(404, "Doctor not found");
  }
  const {
    name,
    email,
    phoneNumber,
    gender,
    imageFile,
    specialty,
    qualifications,
    workingHours,
    availabilityStatus,
  } = updateData;
  if (imageFile) {
    const image = await uploadCloudinary(imageFile);
    if (!image) {
      throw new ApiError(500, "Image upload failed");
    }
    updateData.Image = image.url;
  }
  const updatedDoctor = await DoctorSchema.findByIdAndUpdate(
    doctorId,
    {
      $set: {
        ...(name && { name }),
        ...(email && { email }),
        ...(phoneNumber && { phoneNumber }),
        ...(gender && { gender }),
        ...(specialty && { specialty }),
        ...(qualifications && { qualifications }),
        ...(workingHours && { workingHours }),
        ...(availabilityStatus && { availabilityStatus }),
        ...(updateData.Image && { Image: updateData.Image }),
      },
    },
    { new: true }
  );

  return updatedDoctor;
};

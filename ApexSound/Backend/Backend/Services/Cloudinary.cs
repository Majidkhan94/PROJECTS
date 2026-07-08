using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace Backend.Services
{
    public interface ICloudinary
    {
        Task<string> UploadImage(IFormFile file, string foldername);
    }

    public class Cloudinary : ICloudinary
    {
        private readonly CloudinaryDotNet.Cloudinary _cloudinary;

        public Cloudinary()
        {
            var cloudName = Environment.GetEnvironmentVariable("CLOUDINARY_CLOUD_NAME");
            var apiKey = Environment.GetEnvironmentVariable("CLOUDINARY_API_KEY");
            var apiSecret = Environment.GetEnvironmentVariable("CLOUDINARY_API_SECRET");

            var account = new Account(cloudName, apiKey, apiSecret);
            _cloudinary = new CloudinaryDotNet.Cloudinary(account);
        }

        public async Task<string> UploadImage(IFormFile file, string foldername)
        {
            if (file == null || file.Length == 0) throw new ArgumentException("No file uploaded");

            await using var stream = file.OpenReadStream();
            
            var uploadParams = new ImageUploadParams()
            {
                    File = new FileDescription(file.FileName, stream),
                    Folder = foldername,
                    Transformation = new Transformation().Width(500).Height(500).Crop("fill")
            };
                var uploadResult = await _cloudinary.UploadAsync(uploadParams);
                if (uploadResult.Error != null) throw new Exception(uploadResult.Error.Message);
                return uploadResult.SecureUrl.ToString();
            }
        }

    }


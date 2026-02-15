// R2 image upload utilities

export interface UploadResult {
  success: boolean;
  url?: string;
  key?: string;
  error?: string;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export function validateImage(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Allowed: JPEG, PNG, WebP' };
  }

  if (file.size > MAX_SIZE) {
    return { valid: false, error: 'File too large. Maximum size: 5MB' };
  }

  return { valid: true };
}

export function generateImageKey(filename: string): string {
  const ext = filename.split('.').pop() || 'jpg';
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `products/${timestamp}-${random}.${ext}`;
}

export async function uploadToR2(
  r2: R2Bucket,
  file: ArrayBuffer,
  key: string,
  contentType: string
): Promise<UploadResult> {
  try {
    await r2.put(key, file, {
      httpMetadata: {
        contentType,
        cacheControl: 'public, max-age=31536000',
      },
    });

    const publicUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL || 'https://images.rasabakery.shop'}/${key}`;

    return {
      success: true,
      url: publicUrl,
      key,
    };
  } catch (error) {
    console.error('R2 upload error:', error);
    return {
      success: false,
      error: 'Failed to upload image',
    };
  }
}

export async function deleteFromR2(r2: R2Bucket, key: string): Promise<boolean> {
  try {
    await r2.delete(key);
    return true;
  } catch (error) {
    console.error('R2 delete error:', error);
    return false;
  }
}

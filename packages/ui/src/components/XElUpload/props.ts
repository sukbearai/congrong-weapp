import type { UploadProps } from 'element-plus'

export interface XElUploadProps extends UploadProps {
  onParseExcelSuccess?: (data: any) => void
  onParseExcelFailed?: (err: any) => void
}

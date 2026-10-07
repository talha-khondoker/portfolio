// The ONE place to change your resume download link.
//
// Option A, Google Drive: paste your normal share link below. In Google Drive, right-click the PDF,
// choose Share, set General access to "Anyone with the link" (Viewer), then Copy link.
// Option B, a file on your own site: leave the link as it is and put the PDF in the public folder
// as Talha_Khondoker.pdf.
const SHARE_LINK = 'https://drive.google.com/file/d/1AU2KopdEUjdR7TPvJgbaAXdyOhgfny-d/view?usp=drivesdk'

const LOCAL_FILE = '/Talha_Khondoker.pdf'

const id = SHARE_LINK.match(/\/d\/([^/?#]+)/)?.[1] ?? SHARE_LINK.match(/[?&]id=([^&#]+)/)?.[1]

// True once a real Google Drive link has been pasted above
export const RESUME_IS_DRIVE = Boolean(id) && id !== 'YOUR_FILE_ID'

// Link that downloads the PDF
export const RESUME_DOWNLOAD = RESUME_IS_DRIVE
  ? `https://drive.google.com/uc?export=download&id=${id}`
  : LOCAL_FILE

// Link that opens the PDF in a viewer
export const RESUME_VIEW = RESUME_IS_DRIVE ? `https://drive.google.com/file/d/${id}/view` : LOCAL_FILE

// File name when the PDF comes from your own site (Google Drive chooses its own)
export const RESUME_NAME = 'Talha_Khondoker_Resume.pdf'

// Props for a download link: Drive opens in a new tab, a local file uses the download attribute
export const resumeLinkProps = RESUME_IS_DRIVE
  ? { href: RESUME_DOWNLOAD, target: '_blank', rel: 'noreferrer' }
  : { href: RESUME_DOWNLOAD, download: RESUME_NAME }

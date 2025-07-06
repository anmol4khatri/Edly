"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Download } from "lucide-react"

const PdfDialog = ({ pdf }) => {
  const handleDownload = () => {
    window.open(pdf.pdfUrl, "_blank")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer max-sm:text-base hover:bg-white/10 text-foreground`}
        >
          <FileText className="w-5 h-5 text-red-500" />
          <div className="flex-1">
            <h4 className="font-medium">{pdf.title}</h4>
          </div>
          <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded">PDF</span>
        </div>
      </DialogTrigger>
      <DialogContent className="w-100 gap-0 p-0 [&>button:last-child]:text-white bg-[#17181C] border-gray-700">
        <div className="p-2">
          <div className="w-full h-48 bg-gray-800 rounded-md flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-12 h-12 text-gray-500 mx-auto mb-2" />
              <p className="text-sm text-gray-300">PDF Preview</p>
              <p className="text-xs text-gray-400">{pdf.title}</p>
            </div>
          </div>
        </div>
        <div className="space-y-6 px-6 pt-3 pb-6">
          <DialogHeader>
            <DialogTitle className="text-white">{pdf.title}</DialogTitle>
            <DialogDescription className="text-gray-300">
              This PDF contains important course material. You can download it to view the full content offline.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="default" className="bg-white/10 text-white hover:text-white hover:bg-white/20">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleDownload} className="gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PdfDialog

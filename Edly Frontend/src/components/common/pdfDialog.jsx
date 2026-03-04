'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FileText, Download } from 'lucide-react';

const PdfDialog = ({ pdf }) => {
  const handleDownload = () => {
    window.open(pdf.pdfUrl, '_blank');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="content-item content-item-hover max-sm:text-base text-foreground">
          <FileText className="icon-md icon-pdf" />
          <div className="flex-1">
            <h4 className="font-medium">{pdf.title}</h4>
          </div>
          <span className="badge-pdf">PDF</span>
        </div>
      </DialogTrigger>
      <DialogContent className="w-100 gap-0 p-0 [&>button:last-child]:text-foreground bg-card border-border">
        <div className="p-2">
          <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center">
            <div className="text-center">
              <FileText className="icon-xl text-muted-foreground mx-auto mb-2" />
              <p className="body-small text-muted-foreground">PDF Preview</p>
              <p className="text-xs text-muted-foreground">{pdf.title}</p>
            </div>
          </div>
        </div>
        <div className="space-y-6 dialog-body-padding">
          <DialogHeader>
            <DialogTitle>{pdf.title}</DialogTitle>
            <DialogDescription>
              This PDF contains important course material. You can download it to view the full
              content offline.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleDownload} className="gap-2">
              <Download className="icon-sm" />
              Download PDF
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PdfDialog;

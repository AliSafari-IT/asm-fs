import React from 'react';
import { Button } from '@fluentui/react-components';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';
import { Packer, Document, Paragraph } from 'docx';
import { console } from 'inspector';

interface GenerateFileProps {
    id?: string;
  title: string;
  icon: React.ReactElement;
  filetype: string;
  filename: string;
  className?: string;
}

const GenerateFile: React.FC<GenerateFileProps> = ({ id, title, icon, filetype, filename,  className }) => {
  const generateFile = async () => {
    const element = id ? document.getElementById(id) : document.body;
    if (!element) {
      alert('Element with id=' + id + ' not found');
      return;
    }

    if (filetype === '.pdf') {
      // Use html2canvas to capture the specific element and convert it to PDF
      const canvas = await htmlToImage.toCanvas(element);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();

      // Adding captured image to the PDF (with scaling for quality)
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${filename}.pdf`);
    } 
    
    else if (filetype === '.docx') {
      // Extract and format content from the HTML element for DOCX
      const doc = new Document({
        sections: [
          {
            children: element.innerHTML
              .replace(/<br>/g, '\n')
              .split('\n')
              .map((paragraph) => new Paragraph({ text: paragraph })),
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${filename}.docx`);
    } 
    
    else if (filetype === '.png') {
      htmlToImage.toPng(element)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `${filename}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error('Error generating PNG:', error);
          alert('Failed to generate PNG');
        });
    }
  };

  return (
    <Button
      icon={icon}
      onClick={generateFile}
      title={title}
      className={className + ' hover:text-teal-600 hover:underline'}
      appearance="primary"
      size="large"
    />
  );
};

export default GenerateFile;

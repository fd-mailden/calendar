import React from 'react';
import html2canvas from 'html2canvas';
import styled from "styled-components";

const Button = styled.button`
  padding: 5px 7px;
  background-color: #789b9b;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  margin: 10px 5px;
  cursor: pointer;
  color: #fff;
  transition: opacity 0.3s ease-out;
  &:hover {
    opacity: 0.8;
  }`
export const ScreenshotButton: React.FC = () => {
	const captureScreenshot = () => {
		const targetElement = document.documentElement;

		html2canvas(targetElement).then((canvas) => {
			const screenshot = canvas.toDataURL('image/png');
			const link = document.createElement('a');
			link.href = screenshot;
			link.download = 'screenshot.png';
			link.click();
		});
	};

	return (
		<Button onClick={captureScreenshot}>Screenshot</Button>
	);
};

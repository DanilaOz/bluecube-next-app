"use client";

import DOMPurify from "dompurify";
import parse from "html-react-parser";
import React from "react";

import styles from "./ProductDescription.module.css";

export default function ProductDescription({ data }) {

  const sanitizedHTML = DOMPurify.sanitize(data?.description);
  const parsedHTML = parse(sanitizedHTML);

  // Очистка от HTML-тегов
  const textContent = sanitizeTextContent(parsedHTML);

  // Функция для очистки текстового содержимого от HTML-тегов
  function sanitizeTextContent(node) {
    if (typeof node === "string") {
      return DOMPurify.sanitize(node);
    }
    if (Array.isArray(node)) {
      return node.map((child) => sanitizeTextContent(child));
    }
    if (node.props && node.props.children) {
      const sanitizedChildren = sanitizeTextContent(node.props.children);
      return React.cloneElement(node, null, sanitizedChildren);
    }
    return node;
  }

  return (
    <div className={styles.description}>
      <h2 className={styles.title}>Описание</h2>
      {textContent}
    </div>
  );
}

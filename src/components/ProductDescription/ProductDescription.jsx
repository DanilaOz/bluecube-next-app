'use client'

import { sanitizeHTML } from "dompurify";
import DOMPurify from "dompurify";

import styles from './ProductDescription.module.css'

export default function ProductDescription({ data }) {
    const sanitizedText = DOMPurify.sanitize(data.description, { ALLOWED_TAGS: [] });
    const formattedText = sanitizedText.replace(/([.!?:])\s*/g, '$1 ');
  
    return (
    <div className={styles.description}>
        <h2 className={styles.title}>Описание</h2>
        <p className={styles.formattedText}>{formattedText}</p>
    </div>
  )
}

import FormField from './FormField';

export default function SEOFields({ values, onChange }) {
  return (
    <div className="admin-seo-fields">
      <h3>SEO Settings</h3>
      <FormField label="Meta Title" name="seoMetaTitle" value={values.seoMetaTitle} onChange={onChange} placeholder="Page title for search engines" helpText="Recommended: 50-60 characters" />
      <FormField label="Meta Description" name="seoMetaDesc" type="textarea" value={values.seoMetaDesc} onChange={onChange} placeholder="Page description for search engines" rows={3} helpText="Recommended: 150-160 characters" />
      <FormField label="OG Image URL" name="seoOgImage" value={values.seoOgImage} onChange={onChange} placeholder="https://..." helpText="Image shown when shared on social media" />
    </div>
  );
}

Product/service card with distinctive left blue accent border. Used in the homepage services grid (3 columns, 10 products).

```jsx
// With product image
<ServiceCard
  imageSrc="assets/images/product-glass-door.jpg"
  title="Automatic Glass Doors"
  titleAr="الأبواب الزجاجية الأوتوماتيكية"
  description="CE-certified sliding, swing, and revolving doors for commercial and healthcare environments."
  href="/products/automatic-glass-doors"
/>

// With emoji (demos / prototypes)
<ServiceCard icon="🏭" title="Sectional Doors" description="Heavy-duty insulated sectional doors for warehouses and factories." />

// In a grid
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
  {products.map(p => <ServiceCard key={p.id} {...p} />)}
</div>
```

Cards hover to shadow-md. Left accent border is always accent blue.
Products: Automatic Glass Doors, Sectional Doors, Fast-Action Doors, Loading Dock Systems, Road Barriers, Security Entrances, Automatic Windows, Villa Gates, Sliding Motors, Hangar Doors

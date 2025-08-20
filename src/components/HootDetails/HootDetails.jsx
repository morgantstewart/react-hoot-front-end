
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as hootService from '../../services/hootService';

// src/components/HootDetails/HootDetails.jsx

const HootDetails = () => {
  const { hootId } = useParams();
  const [hoot, setHoot] = useState(null);

  console.log('hootId', hootId);

  useEffect(() => {
    const fetchHoot = async () => {
      try {
        const hootData = await hootService.show(hootId);
        setHoot(hootData);
      } catch (error) {
        console.error('Error fetching hoot:', error);
      }
    };
    if (hootId) {
      fetchHoot();
    }
  }, [hootId]);

  // Verify the hoot state is set correctly:
  console.log('hoot state:', hoot);

  if (!hoot) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <h1>Hoot Details</h1>
      <article>
        <header>
          <h2>{hoot.title}</h2>
          <p>
            {`${hoot.author?.username} posted on
            ${new Date(hoot.createdAt).toLocaleDateString()}`}
          </p>
        </header>
        <p>{hoot.text}</p>
      </article>
    </main>
  );
};

export default HootDetails;

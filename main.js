// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

function pAequorFactory (specimenNum, dna) {
  const pAequor = {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      // Generate a random mutation within this organism
      const mutationIndex = Math.floor(Math.random() * this.dna.length); // Location of mutation
      let mutatedDNA = this.dna[mutationIndex];
      while (mutatedDNA === this.dna[mutationIndex]) { 
      // Randomly generate DNA base until different from the original DNA base at this index
        mutatedDNA = returnRandBase();
      }
      this.dna.splice(mutationIndex,1,mutatedDNA); // Update DNA string with mutation
    },
    compareDNA(newpAequor) { // Compare DNA between this organism and new organism
      let totalSimilar = 0;
      for (let i = 0; i < newpAequor.dna.length; i++) { // Check for variances between DNA strands
        if (this.dna[i] === newpAequor.dna[i]) {
          totalSimilar++;
        }
      }
      console.log('Specimen', this.specimenNum, 'and specimen', newpAequor.specimenNum, 'have', ((totalSimilar/newpAequor.dna.length)*100).toFixed(2), '% DNA in common.');
    },
    willLikelySurvive () {
      // Return true if 60% or more of the DNA is 'C' or 'G' 
      let goodDNACount = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          goodDNACount++;
        }
      }
      return (goodDNACount/this.dna.length >= 0.60);
    }
  }
  return pAequor;
}

function generatePopulation (num) {
  // Create surviving instances of pAequor
  let organismArr = [];
  let i = 0;
  while (organismArr.length < num) { 
    const sampleName = ('Sample ' + (i + 1));
    do {
      organismArr[i] = pAequorFactory(sampleName, mockUpStrand()); 
    } while (!organismArr[i].willLikelySurvive()); // Generate dna strands until likely survival = true
    i++;
  }
  return organismArr;
}

// Tests
pAequorArray = generatePopulation(30) // Generate 30 instances of surviving pAequor
console.log(pAequorArray[14].specimenNum,pAequorArray[14].dna)
pAequorArray[14].mutate();
console.log(pAequorArray[14].specimenNum,pAequorArray[14].dna)
console.log();
console.log(pAequorArray[10].specimenNum,pAequorArray[10].dna)
console.log(pAequorArray[23].specimenNum,pAequorArray[23].dna)
pAequorArray[10].compareDNA(pAequorArray[23]);
console.log();
console.log(pAequorArray[4].specimenNum,pAequorArray[4].dna)
console.log('Will likely survive?', pAequorArray[4].willLikelySurvive());

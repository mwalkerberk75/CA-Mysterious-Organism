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
      let totalVariations = 0;
      for (let i = 0; i < newpAequor.dna.length; i++) { // Check for variances between DNA strands
        if (!(this.dna[i] === newpAequor.dna[i])) {
          totalVariations++;
        }
      }
      console.log('Specimen', this.specimenNum, 'and specimen', newpAequor.specimenNum, 'have', (100-((totalVariations/newpAequor.dna.length)*100).toFixed(2)), '% DNA in common.');
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

// Create 30 instances of pAequor
let pAequorArray = [];
for (let i = 0; i < 30; i++) {
  const sampleName = ('Sample ' + (i + 1));
  pAequorArray.push(pAequorFactory(sampleName, mockUpStrand()));
}

// Tests
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

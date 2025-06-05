import { Injectable, signal } from '@angular/core';
import { CoreValue } from './core-value';
import { Observable, of } from 'rxjs';
import { ValueBucket } from './value-bucket';

//TS doesnt have a built in shuffle function :( I fully stole this from stackoverflow. Looks like it should work just fine tho. 
function shuffle(array : string[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {

    // This line is so rad. I'm mostly just trusting that math means this is a balanced selection. But I do see why it gets a number between 0 and length.
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    //also this swap is witchcraft. Ts is so cool
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

@Injectable({
  providedIn: 'root'
})
export class ValuesManagerService {
  private userVals: CoreValue[];
  public userBuckets = signal<ValueBucket[]>([])
  
  constructor() { 
    shuffle(testArray)
    //shuffle(valueArray);
    this.userVals = testArray.map((value, index) => ({
      //this.userVals = valueArray.map((value, index) => ({
        id: index,
        value: value,
        trashed: false
      }));
    }
    
    getValsLength(): number {
      return this.userVals.length;
    }
    
    getValAt(index : number): CoreValue{
    const val = this.userVals.at(index);
    if (val === undefined){
      throw new Error(`Tried to access invalid idex: ${index}`)
    } else{
      return val;
    }
  }
  
  setTrashed(index: number, trashed: boolean): void{
    if (index >= 0 && index < this.userVals.length){
      this.userVals[index].trashed = trashed;
    } else {
      throw new Error(`Tried to access invalid idex: ${index}`);
    }
  }
  
  getPercentTrashed(): number{
    const length = this.userVals.length
    const numTrashed = this.userVals.filter(value => value.trashed).length
    return length === 0 ? 0 : (numTrashed / length) * 100
  } 
  
  //first time trying observables! Theyre kinda rad!
  getValsObservable(): Observable<CoreValue[]> {
    //So basically this of thing turns an array into an observable. If I was using an http.get it would already be observable and I wouldnt need an array
    return of(this.userVals);
  }

  cleanUserVals(): void {
    this.userVals = this.userVals.filter((value: CoreValue) => !value.trashed);
  }
  
  createBucket(){
    const lastId = this.userBuckets().length > 0
    ? Math.max(...this.userBuckets().map(bucket => bucket.id))
    : -1;
    
    let newBucket: ValueBucket = {
      id: lastId + 1,
      color: 'red',
      values: []
    }
    
    this.userBuckets.update(oldBuckets => {
      oldBuckets.push(newBucket);
      return oldBuckets;
    });
  }
  
  deleteBucket(idToDelete: number){
    const originalLength = this.userBuckets().length;
    this.userBuckets.update((oldBuckets) => oldBuckets.filter(bucket => bucket.id !== idToDelete));
    
    if (this.userBuckets().length === originalLength) {
      console.warn(`Bucket with id ${idToDelete} not found.`);
    }
  }

  addToBucket(val: CoreValue, givenBucket: ValueBucket) {
    givenBucket.values.push(val);

    this.userBuckets.update(oldArray => {
      const newArray = [...oldArray];
      newArray[givenBucket.id] = givenBucket;
      return newArray;
    });
  }
  
  getAllBuckets() {
    this.userBuckets();
  }
}

const testArray = [
  "one", "two", "three", "four", "five"
]

const valueArray = [
  "Abundance",
  "Acceptance",
  "Accountability",
  "Accuracy",
  "Achievement",
  "Adaptability",
  "Adventure",
  "Affection",
  "Alignment",
  "Alone Time",
  "Altruism",
  "Anti-Racism",
  "Appreciation",
  "Artistry",
  "Autonomy",
  "Authenticity",
  "Awareness",
  "Balance",
  "Beauty",
  "Belonging",
  "Bliss",
  "Boldness",
  "Bravery",
  "Calmness",
  "Caring",
  "Change",
  "Change the World",
  "Charisma",
  "Charity",
  "Clarity",
  "Cleanliness",
  "Clear Communication",
  "Cleverness",
  "Community",
  "Compassion",
  "Confidence",
  "Consciousness",
  "Consistency",
  "Contentment",
  "Contribution",
  "Cooperation",
  "Courage",
  "Creativity",
  "Credibility",
  "Curiosity",
  "Decisiveness",
  "Dedication",
  "Deep Connections",
  "Dependability",
  "Dignity",
  "Efficiency",
  "Empathy",
  "Encouragement",
  "Enthusiasm",
  "Entrepreneurship",
  "Environmental Protection",
  "Equity",
  "Equality",
  "Excellence",
  "Expansion",
  "Experimentation",
  "Exploration",
  "Fairness",
  "Faith",
  "Fame",
  "Family ",
  "Fidelity",
  "Financial Security",
  "Finesse",
  "Forgiveness",
  "Freedom",
  "Friendliness",
  "Friendship",
  "Fun",
  "Generosity",
  "Gentleness",
  "Going with the Flow",
  "Goodness",
  "Grace ",
  "Gracefulness",
  "Gratitude",
  "Happiness",
  "Harmony",
  "Health",
  "Honesty",
  "Honor",
  "Hope",
  "Humility",
  "Humor",
  "Imagination",
  "Independence",
  "Influence",
  "Ingenuity",
  "Inspiration",
  "Inspirational",
  "Initiative",
  "Innovation",
  "Insightfulness",
  "Integrity",
  "Intimacy",
  "Intuition",
  "Job Security",
  "Joy",
  "Justice",
  "Kindness",
  "Knowledge",
  "Laughter",
  "Lawfulness",
  "Leadership",
  "Learning",
  "Legacy",
  "Loyalty",
  "Making a difference",
  "Mentorship",
  "Modesty",
  "Mutual Support",
  "Nature",
  "Natural Living",
  "Non-Conformity",
  "Non-Violence",
  "Open-Mindedness",
  "Openness",
  "Optimism",
  "Order",
  "Organization",
  "Originality",
  "Passion",
  "Patience",
  "Peace",
  "Peace of Mind",
  "Perseverance",
  "Persistence",
  "Personal Development",
  "Personal Expression",
  "Personal Fulfillment",
  "Planning",
  "Playfulness",
  "Positive Attitude",
  "Positive Impact",
  "Power",
  "Presence",
  "Pride",
  "Problem-Solving",
  "Professionalism",
  "Profit",
  "Promise-keeping",
  "Prosperity",
  "Protecting Others",
  "Quality",
  "Reciprocity",
  "Recognition",
  "Reliability",
  "Resourcefulness",
  "Respect",
  "Responsibility",
  "Restraint",
  "Righteousness",
  "Risk-taking",
  "Romance",
  "Self-Discipline",
  "Self-Expression",
  "Self-Love",
  "Self-Motivation",
  "Self-Preservation",
  "Self-Respect",
  "Selflessness",
  "Service  ",
  "Service to Others",
  "Simplicity",
  "Sincerity",
  "Social Justice",
  "Spirituality",
  "Spontaneity",
  "Sportsmanship",
  "Stability",
  "Stewardship",
  "Strength",
  "Success",
  "Sustainability",
  "Sweetness",
  "Teamwork",
  "Thoughtfulness",
  "Thrift",
  "Tidiness",
  "Timeliness",
  "Tolerance",
  "Tradition",
  "Transparency",
  "Travel",
  "Truth",
  "Trust",
  "Trust Your Gut",
  "Understanding",
  "Uniqueness",
  "Vivaciousness",
  "Vision",
  "Vulnerability",
  "Warmth",
  "Wealth",
  "Well-being",
  "Wellness",
  "Wholeheartedness",
  "Wisdom",
  "Wit",
]

<script>
    import AnswerButton from "./AnswerButton.svelte";
    import {getQuizdata} from "./quizdataFactory";
    let currentScore = 0;
    let renzoukuSeikai = 0;
    let quizdata = getQuizdata();

    const answerButtonClicked = (isCorrect) => {
        if(isCorrect){
            renzoukuSeikai += 1;
            currentScore += renzoukuSeikai;
        }
        else{
            renzoukuSeikai = 0;
        }

        quizdata = getQuizdata();
    };
</script>

<main class="flex flex-col h-dvh">
    <!-- メニューバー -->
    <div class="bg-red-200 flex justify-around text-xl font-bold p-3">
        <div>スコア:{currentScore}</div>
        <div>連続正解数:{renzoukuSeikai}</div>
    </div>

    <!-- 問題 -->
    <div class="bg-green-200 text-center text-4xl py-4">{quizdata.mondai}</div>
    
    <!-- 選択肢 -->
    <div class="bg-blue-200 flex flex-col justify-around flex-grow items-center">
        {#each quizdata.taku as t}
            <AnswerButton on:click={() => answerButtonClicked(quizdata.seikai===t)}>{t}</AnswerButton>
        {/each}
    </div>
</main>

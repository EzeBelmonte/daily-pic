


export async function getPublicationStatus(userId: number) {
  console.log("1. USER ID:", userId);

  try {
    const lastPost =
      await postsRepository.findLastByUserId(userId);

    console.log("2. LAST POST:", lastPost);

    const currentPeriodStart =
      getCurrentPublicationPeriodStart();

    console.log(
      "3. CURRENT PERIOD START:",
      currentPeriodStart
    );

    const nextPublicationAt =
      getNextPublicationPeriodStart();

    console.log(
      "4. NEXT PUBLICATION:",
      nextPublicationAt
    );

    const canPublish =
      !lastPost ||
      lastPost.createdAt < currentPeriodStart;

    console.log(
      "5. CAN PUBLISH:",
      canPublish
    );

    return {
      canPublish,
      nextPublicationAt: canPublish
        ? null
        : nextPublicationAt.toISOString(),
    };

  } catch (error) {
    console.error(
      "❌ ERROR EN getPublicationStatus:",
      error
    );

    throw error;
  }
}